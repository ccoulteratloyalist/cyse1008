import { Helmet } from 'react-helmet-async';

import { CreateProductView } from '../../sections/admin/view';

// ----------------------------------------------------------------------

export default function CreateProductPage() {
  return (
    <>
      <Helmet>
        <title> Create Product | Minimal UI </title>
      </Helmet>

      <CreateProductView />
    </>
  );
}
