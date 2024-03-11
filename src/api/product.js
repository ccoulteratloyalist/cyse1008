import useSWR from 'swr';
import { useMemo, useState, useEffect } from 'react';
import { query, getDocs, collection } from "firebase/firestore";
import { fetcher, endpoints } from 'src/utils/axios';
import { DB } from 'src/auth/context/firebase/lib';

// ----------------------------------------------------------------------

// export function useGetProducts() {
//   const URL = endpoints.product.list;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       products: data?.products || [],
//       productsLoading: isLoading,
//       productsError: error,
//       productsValidating: isValidating,
//       productsEmpty: !isLoading && !data?.products.length,
//     }),
//     [data?.products, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

export function useGetProducts() {
  const [data, setData] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(DB, "products")); // Assuming you have a collection named 'products'
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData({ products });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products from Firestore:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // This effect runs once on component mount

  // Memoize value to avoid unnecessary re-renders
  const memoizedValue = useMemo(() => ({
    products: data.products,
    productsLoading: isLoading,
    productsError: error,
    productsValidating: isLoading, // For consistency with the original function's return value
    productsEmpty: !isLoading && !data.products.length,
  }), [data.products, error, isLoading]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(_query) {
  const URL = _query ? [endpoints.product.search, { params: { _query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
