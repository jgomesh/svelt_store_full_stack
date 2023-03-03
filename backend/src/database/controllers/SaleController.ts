import { Request, Response } from "express";
import Products from "../models/products";
import Sales from "../models/sales";
import User from '../models/user';
import SalesProducts from '../models/salesProducts';
import { Sequelize } from 'sequelize';

class SalesController {
  async getAll(_req: Request , res: Response) {
    const SalesExists = await Sales.findAll();

    if(!SalesExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json( {  sales: SalesExists  });
  }

  async getSellerSales(req: Request | any, res: Response) {
    const SalesExists = await Sales.findAll({ where: {seller_id: req.userId}});

    if(!SalesExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json( {  sales: SalesExists  });
  }

  async getById(req: Request | any, res: Response) {
    const SaleExist = await Sales.findAll({where: { user_id: req.userId }});

    if(!SaleExist) {
      return res.sendStatus(404);
    };

    return res.status(201).json( {  sale: SaleExist  });
  }

  async getSalesProducts (_req: Request, res: Response) {
    const SalesExists = await SalesProducts.findAll();

    if(!SalesExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json( {  salesProducts: SalesExists  });
  }


  async getSalesProductsId (req: Request | any, res: Response) {
    const { id } = req.params;
    const SalesExist = await Sales.findByPk(id);
    
    if(!SalesExist && (id !== req.userId)) {
      return res.sendStatus(409);
    }

    const dataSalesProducts = await SalesProducts.findAll({ where: { sale_id: id }});

    return res.status(201).json( {  salesProducts: dataSalesProducts, sale: SalesExist });
  }

  async create(req: Request | any, res: Response) {
    const sale = req.body;
    const { sales_products } = sale;

    const userExists = await User.findOne({
      where: { id: req.userId }
    })

    if(!userExists) {
      return res.sendStatus(404);
    }

    const newSale: any = await Sales.create({ ...sale, sale_date: new Date().toLocaleDateString(), user_id: req.userId, status: "em espera"} );

    const newSalesProducts = await Promise.all(sales_products.map(async (saleProduct:any) => {
      await SalesProducts.create({sale_id: newSale.id, ...saleProduct});
      const product = await Products.findByPk(saleProduct.id);

      return {
        ...product?.dataValues,
        quantity: saleProduct.quantity,
      }
    }));

    if(!newSalesProducts) {
      return res.sendStatus(404);
    };

    return res.status(200).json({ ...newSale.dataValues, salesProducts: newSalesProducts });
  }

  async updateStatus(req: Request | any, res: Response) {
    const { id } = req.params;
    const SaleExist = await Sales.findByPk(id);
    const options = ['em espera', 'em preparo', 'a caminho', 'entregue'];
  
    if(!SaleExist) {
      res.status(409).json({message: "Sale not found!!"});
    }
    const nextStatus =  Number(options.indexOf(SaleExist?.dataValues.status)) + 1;
    const saleUpdated = await Sales.update({status: options[nextStatus]}, { where: { id }});
    res.status(200).json({ saleUpdated, status: options[nextStatus]});
  }

  async canceledStatus(req: Request | any, res: Response) {
    const { id } = req.params;
    const SaleExist = await Sales.findByPk(id);
  
    if(!SaleExist) {
      res.status(409).json({message: "Sale not found!!"});
    }
    const saleUpdated = await Sales.update({status: 'canceled'}, { where: { id }});
    res.status(200).json({ saleUpdated, status: 'canceled'});
  }
  async getTopSellers(_req: Request, res: Response) {
    const sellers = await Sales.findAll({
      attributes: [
        'seller_id',
        [Sequelize.fn('COUNT', Sequelize.col('seller_id')), 'total_sales'],
      ],
      group: ['seller_id', 'seller.id', 'seller.name'], // Adiciona os campos na cláusula GROUP BY
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'name', 'role'],
        where: {
          role: ['seller', 'admin']
        }
      },
      ],
    });
    
    const topSellers = sellers.map((seller: any) => ({
      id: seller.seller.id,
      name: seller.seller.name,
      total_sales: seller.get('total_sales'),
    }));
    
    return res.json(topSellers);
  }

  async getTopProducts(req: Request, res: Response) {
    const topProducts = await SalesProducts.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_sales'],
        'product_id',
      ],
      group: ['tsauth.product_id', 'product.id', 'product.name', 'product.price'],
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Products,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });
  
    const result = topProducts.map((product: any) => ({
      id: product.product.id,
      name: product.product.name,
      total_sales: product.get('total_sales'),
    }));
  
    res.json(result);
  }
  
  async getTopSellersWithSales(_req: Request, res: Response) {
    const sellers = await Sales.findAll({
      attributes: [
        'seller_id',
        [Sequelize.fn('SUM', Sequelize.col('sales_products.total_price')), 'total_sales'],
      ],
      group: ['seller.id', 'seller.name'],
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'role'],
          where: {
            role: ['seller', 'admin']
          }
        },
        {
          model: SalesProducts,
          as: 'sales_products',
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('sales_products.price * sales_products.quantity')), 'total_price'],
          ],
          include: [
            {
              model: Products,
              as: 'product',
              attributes: ['id', 'name', 'price'],
            },
          ]
        }
      ],
    });
  
    const topSellers = sellers.map((seller: any) => ({
      id: seller.seller.id,
      name: seller.seller.name,
      total_sales: seller.get('total_sales'),
    }));
  
    return res.json(topSellers);
  }
  
  
}

export default new SalesController;
