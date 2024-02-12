import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const CreateProductForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(productData); // Here, you would typically send the data to your backend.
        // Reset form
        setProductData({
            name: '',
            description: '',
            price: '',
        });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack>
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
                <Button type="submit" variant="contained" sx={{ m: 1 }} size="small">
                    Submit
                </Button>
            </Stack>

        </Box>
    );
};

export default CreateProductForm;
