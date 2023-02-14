import { useState, useEffect } from "react";
import redirect from "../utils/redirect";
import getSellerName from "../utils/api/getSellerName";
import updateStatus from "../utils/api/updateStatus";

function UserSell({ name, sale_date, status, total_price, history, id }: { id: number, history: { push: Function }, shops: any, name: number, sale_date:string, status:string, total_price: string | number}) {
  const [statusSell, setStatusSell] = useState(status);
  const [loading, setLoading] = useState(false);
  const [sellerName, setSellerName] = useState({ name: "" });

  useEffect(() => {
    const getData = async () => {
      const { seller } : any = await getSellerName('seller_name', name);
  
      setSellerName({ name: seller.name} );
    };
    getData();
  }, []);


  const confirmDeliver = async () => {
    setLoading(true);
    const update = await updateStatus('status', id);
    setStatusSell(update.status);
    setLoading(false);
  };

  return (
    <div>
      {loading ? "Loading..." : (
        <>
          <h3> {`Seller: ${sellerName.name}`} </h3>
          <span>{sale_date}</span>
          <p>{statusSell}</p>
          <span>total: {Number(total_price).toFixed(2)}</span>
          <div>
            <button onClick={(event) => redirect(event, history, `/user_sells/${id}`)}>
              View More
            </button>
          </div>
          {statusSell === 'a caminho' && (
            <button onClick={confirmDeliver}>
              CONFIRMAR ENTREGA
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default UserSell;
