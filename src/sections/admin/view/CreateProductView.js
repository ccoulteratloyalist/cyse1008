import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { fetchProducts, addProduct } from '../../../store'; // Adjust the import path as necessary

const CreateProductForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
    });

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items); // Accessing the list of products

    useEffect(() => {
        dispatch(fetchProducts()); // Fetch products when component mounts
    }, [dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(addProduct({
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
        }));
        setProductData({
            name: '',
            description: '',
            price: '',
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}> {/* Form Column */}
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6" gutterBottom>
                        Create Product
                    </Typography>
                    <TextField
                        required
                        label="Name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={productData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        label="Price"
                        name="price"
                        type="number"
                        value={productData.price}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" sx={{ m: 1 }}>
                        Submit
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}> {/* Products List Column */}
                <Typography variant="h6" gutterBottom>
                    Products List
                </Typography>
                {products.map((product) => (
                    <Card key={product.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                ${product.price}
                            </Typography>
                            <Typography variant="body2">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
};

export default CreateProductForm;
