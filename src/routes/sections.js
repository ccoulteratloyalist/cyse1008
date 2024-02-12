import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../layouts/dashboard';

export const IndexPage = lazy(() => import('../pages/App'));
export const BlogPage = lazy(() => import('../pages/Blog'));
export const UserPage = lazy(() => import('../pages/User'));
export const LoginPage = lazy(() => import('../pages/Login'));
export const CreateProductPage = lazy(() => import('../pages/admin/CreateProduct'));
export const EditProductPage = lazy(() => import('../pages/admin/EditProduct'));
export const ListProductsPage = lazy(() => import('../pages/admin/ListProducts'));
export const ProductsPage = lazy(() => import('../pages/Products'));
export const Page404 = lazy(() => import('../pages/Page-Not-Found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'admin/products/create', element: <ProtectedRoute><CreateProductPage /></ProtectedRoute> },
        { path: 'admin/products/edit/:id', element: <ProtectedRoute><EditProductPage /></ProtectedRoute> },
        { path: 'admin/products', element: <ProtectedRoute><ListProductsPage /></ProtectedRoute> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
