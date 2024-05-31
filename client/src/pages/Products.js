import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';
import ProductList from '../features/product/components/ProductList'
import { Navigate } from 'react-router-dom';

const Products = () => {
    const isUserLoggedIn = useSelector(selectLoggedInUser);

    return (
        <>
            {!isUserLoggedIn && <Navigate to={'/auth/signin'} replace={true} />}
            <ProductList />
        </>
    )
}

export default Products;