function ShopDetailsProd({ shopDetails }: { shopDetails: any }) {

  return (
    <>
      {shopDetails.products.map((product: any, index: number) => (
        <div key={index}>
          <h4>{product.name}</h4>
          <img src={product.url_image} alt={product.name} />
          <p>{product.quantity}</p>
        </div>
      ))}
    </>
  );
}

export default ShopDetailsProd;
