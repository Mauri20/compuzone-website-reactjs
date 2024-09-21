import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Layout from 'components/Organisms/Layout';
import Swal from 'sweetalert2';

function ComputerForm() {
    const [formData, setFormData] = useState({
        size: '',
        color: '',
        price: '',
        category: '',
        trademark: '',
        model: '',
        style: '',
        image: null,
    });
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? e.target.files[0] : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity()) {
            const formData2 = new FormData();
            formData2.append('size', formData.size);
            formData2.append('color', formData.color);
            formData2.append('price', formData.price);
            formData2.append('category', formData.category);
            formData2.append('trademark', formData.trademark);
            formData2.append('model', formData.model);
            formData2.append('style', formData.style);
            formData2.append('image', formData.image);

            try {
                const response = await fetch('http://localhost:8080/v1/shoes/create', {
                    method: 'POST',
                    body: formData2
                });
                console.dir(formData2);
                if (response.ok) {
                    Swal.fire({
                        title: 'Registro exitoso',
                        text: 'Registro incluido con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    setFormData({
                        size: '',
                        color: '',
                        price: '',
                        category: '',
                        trademark: '',
                        model: '',
                        style: '',
                        image: null
                    });
                } else {
                    const errorResponse = await response.json();
                    Swal.fire({
                        title: '¡Error!',
                        text: errorResponse,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Layout>
            <Row className="justify-content-md-center mt-2"><h1 style={{ textAlign: 'center', color: '#000', textShadow: '1px 1px 2px black', fontSize: '40px', marginTop: '20px' }}>Agregar Computadoras</h1></Row>
            <Row className="justify-content-md-center mt-1">
                <Col md={{ span: 12 }}>
                    <Card>
                        <Card.Body><Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Tama&ntilde;o</Form.Label>
                                        <Form.Control required type="text" name="size" value={formData.size} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control required type="text" name="color" value={formData.color} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control required type="text" name="price" value={formData.price} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Categoría</Form.Label>
                                        <Form.Control required type="text" name="category" value={formData.category} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control required type="text" name="trademark" value={formData.trademark} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control required type="text" name="model" value={formData.model} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Estilo</Form.Label>
                                        <Form.Control required type="text" name="style" value={formData.style} onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-2">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control required type="file" name="image" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='justify-content-md-center'>
                                <Button variant="success" type="submit">
                                    Registrar
                                </Button>
                            </Row>
                        </Form></Card.Body>
                    </Card>

                </Col>
            </Row>
        </Layout >
    );
}

export default ComputerForm;