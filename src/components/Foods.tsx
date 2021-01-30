import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, ListGroup, Modal, Row} from 'react-bootstrap';
import * as model from '../model';
import {List} from 'immutable';
import {nanoid} from 'nanoid';
import {Formik} from 'formik';
import * as yup from 'yup';

function fmt_kj(quantity: number) {
    return quantity.toLocaleString(
        undefined,
        {maximumFractionDigits: 0}
    );
}

function fmt_g(quantity: number) {
    return quantity.toLocaleString(
        undefined,
        {minimumFractionDigits: 1, maximumFractionDigits: 1}
    );
}


function Summary(props: { food: model.Food, onCopy: () => any }) {
    return (<ListGroup.Item>
        <Row noGutters>
            <Col>
                <Row>{props.food.name} ({props.food.unit})</Row>
                <Row>
                    E{fmt_kj(props.food.energy)} /
                    F{fmt_g(props.food.fat)} /
                    C{fmt_g(props.food.carbohydrates)} /
                    P{fmt_g(props.food.protein)}
                </Row>
            </Col>
            <Col xs={"auto"}>
                <Button variant="primary" onClick={props.onCopy}>Copy</Button>
            </Col>
        </Row>
    </ListGroup.Item>)
}

function NutrientInput(props: { name: string, value: number, unit: string, touched: boolean | undefined, error: string | undefined, onChange: (e: React.ChangeEvent<any>) => void, onBlur: (e: React.FocusEvent<any>) => void }) {
    return <Form.Group>
        <Form.Label>{props.name}</Form.Label>
        <InputGroup>
            <FormControl
                name={props.name.toLowerCase()}
                placeholder={props.name}
                type="number"
                step="any"
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={props.touched ? props.error ? "is-invalid" : "is-valid" : undefined}
                value={props.value}
            />
            <InputGroup.Append>
                <InputGroup.Text>{props.unit}</InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
        </InputGroup>

    </Form.Group>
}

function CreateFoodModal(props: { food: model.Food, save: (food: model.Food) => any, discard: () => any }) {
    return (<Modal show onHide={props.discard}>
        <Formik
            initialValues={{...props.food, name: ""}}
            onSubmit={(values, actions) => {
                props.save(values);
            }}
            validationSchema={yup.object().shape({
                name: yup.string()
                    .required(),
                quantity: yup.number()
                    .positive()
                    .required(),
                unit: yup.string()
                    .oneOf(["g"], "Only 'g' is currently supported")
                    .required(),
                energy: yup.number()
                    .min(0)
                    .required(),
                fat: yup.number()
                    .min(0)
                    .required(),
                carbohydrates: yup.number()
                    .min(0)
                    .required(),
                protein: yup.number()
                    .min(0)
                    .required(),
            })}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create food</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder={"Name"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={touched.name ? errors.name ? "is-invalid" : "is-valid" : undefined}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Quantity</Form.Label>
                                <FormControl
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.quantity ? errors.quantity ? "is-invalid" : "is-valid" : undefined}
                                    value={values.quantity}
                                />
                                <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Unit</Form.Label>
                                <FormControl
                                    type="text"
                                    name="unit"
                                    placeholder="Unit"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.unit ? errors.unit ? "is-invalid" : "is-valid" : undefined}
                                    value={values.unit}
                                />
                                <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <hr/>
                        <NutrientInput
                            name="Energy"
                            unit="kJ"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.energy}
                            error={errors.energy}
                            value={values.energy}
                        />
                        <NutrientInput
                            name="Fat"
                            unit="g"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.fat}
                            error={errors.fat}
                            value={values.fat}
                        />
                        <NutrientInput
                            name="Carbohydrates"
                            unit="g"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.carbohydrates}
                            error={errors.carbohydrates}
                            value={values.carbohydrates}
                        />
                        <NutrientInput
                            name="Protein"
                            unit="g"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.protein}
                            error={errors.protein}
                            value={values.protein}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    </Modal>)
}


function FoodsPage({defaultFoods}: { defaultFoods: List<model.Food> }) {
    const [foods, setFoods] = useState(defaultFoods);
    const [copying, setCopying] = useState<model.Food | null>(null)

    return (<>
        {copying !== null &&
        <CreateFoodModal
            food={copying}
            save={(food) => {
                setFoods(foods.insert(0, food));
                setCopying(null);
            }}
            discard={() => setCopying(null)}
        />
        }
        <Container>
            <ListGroup>
                {foods.map((food) => <Summary
                    food={food}
                    key={food.id}
                    onCopy={() => setCopying({...food, id: "food-" + nanoid()})}
                />)}
            </ListGroup>
        </Container>
    </>)
}


export default FoodsPage;
