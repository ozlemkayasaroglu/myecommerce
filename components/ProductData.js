export default async function ProductData(id) {
    const res = await fetch(
        `http://localhost:3001/products?id=${id}`
      );
  
   if (!res.ok) {
     throw new Error('Failed to fetch data')
   }
   const productData = await res.json()
   return productData;
}