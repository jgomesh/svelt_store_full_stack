import { useEffect, useState } from "react";
import getProductById from "../utils/api/getProductById";
import updateStatus from "../utils/api/updateStatus";
import getUserSaleDetails from "../utils/api/getUserSaleDetails";

function SellItem({ sell }: any) {
  const [loading, setLoading] = useState(true);
  const [saleStatus, setStatus] = useState('')
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSaleDetails = async () => {
      const saleDetails = await getUserSaleDetails('user_sells',sell.id);
      const products: any = await Promise.all(saleDetails.salesProducts.map(async (product: any) => {
        const productFound = await getProductById(product.product_id);
        return { ...productFound.product, quantity: product.quantity};
      }));
      setStatus(saleDetails.sale.status);
      setProducts(products);
      setLoading(false);
    };
    getSaleDetails();
  }, []);

  const nextStatus = async () => {
    setLoading(true);
    const update = await updateStatus('status', sell.id);
    setStatus(update.status);
    setLoading(false);
  }

  const cancelStatus = async () => {
    setLoading(true);
    const update = await updateStatus('cancel_status', sell.id);
    setStatus(update.status ? update.status : saleStatus);
    setLoading(false);
  }

  return (
    
            <div>
              {loading ? "Loading..." : (
                <div className="product_div">
                  <p>{`Status: ${saleStatus}`}</p>
                  <p>{`Address: ${sell.delivery_address}, ${sell.delivery_number}`}</p>
                  <p>{`Sale date: ${sell.sale_date}`}</p>
                  {products.map((product: any, index: number) => (
                    <>
                      <div key={index}>
                        <h4>{product.name}</h4>
                        <img className="seller_product" src={product.url_image} alt={product.name}/>
                      </div>
                      <span>{`${product.quantity} X R$${product.price}`}</span>
                    </>
                  ))}
                  <div className="total_price_seller">{`total: ${sell.total_price}`}</div>
                  {saleStatus === "em espera" && (
                    <div className="seller_buttons">
                      <button onClick={nextStatus}>ACEITAR COMPRA</button>
                      <button onClick={cancelStatus}>RECUSAR COMPRA</button>
                    </div>
                  )}
                  {saleStatus === "em preparo" && (
                    <div className="seller_buttons">
                      <button onClick={nextStatus}>ENVIAR COMPRA</button>
                    </div>
                  )}
                </div>
              )}
            </div>
  );
}

export default SellItem;
