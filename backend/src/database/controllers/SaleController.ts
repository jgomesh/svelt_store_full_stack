import { Request, Response } from "express";
import Products from "../models/products";
import Sales from "../models/sales";
import User from '../models/user';
import SalesProducts from '../models/salesProducts';

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
}

export default new SalesController;
