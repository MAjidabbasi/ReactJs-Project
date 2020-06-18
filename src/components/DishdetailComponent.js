import React, { Component } from 'react';
import { Card, CardImg, Col,
    ModalHeader, Modal, ModalBody, Label,CardBody,Button, BreadcrumbItem, Breadcrumb, CardText, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {Control, LocalForm, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len); 

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
            // alert('States are : ' + JSON.stringify(values) );
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

    }

    render() {
        return (
            <div>
                <Button outline submit onClick={this.toggleModal}>
                    <span className='fn fn-submit fn-large' ></span> Submit Comment
            </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Col className='form-group'>
                                <Label htmlFor='rating'>Rating</Label>

                                <Control.select model='.rating' id='rating' name='rating'
                                    className='form-control'   >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>


                            <Col className='form-group'>
                                <Label htmlFor='author'>Author</Label>

                                <Control.text model='.author' id='author' name='author'
                                    placeholder='Author'
                                    className='form-control'
                                    validators = {{
                                            required,minLength : minLength(3),maxLength: maxLength(15)
                                        }}
                                />
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        required: 'Required & Text ',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }}

                                />

                            </Col>
                            <Col className='form-group'>
                                <Label htmlFor= 'comment'>Comment</Label>
                                <Control.textarea model = '.comment' 
                                rows = '6'
                                className='form-control'
                                placeholder='Type your comment here'
                                id='comment'
                                name='comment'
                                ></Control.textarea>
                            </Col>
                            <Col>
                                <Button type='submit' color='primary'>
                                        Submit
                                </Button>
                            </Col>

                        </LocalForm>
                    </ModalBody>

                </Modal>
            </div>


        )
    }

}


function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        return (
          <div >
            <h4>Comments</h4>
            
              {comments.map(comment => {
                return (
                    <li key={comment.id} className='list-unstyled'>
                      <p>{comment.comment}</p>
                      <p>-- {comment.author} ,{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit"
                        }).format(new Date(Date.parse(comment.date)))}
                      </p>
                    </li>
                  
                );
              })}

              

              <CommentForm dishId = {dishId} addComment = {addComment} />
          </div>

        );
      } else return <div />;
}

function RenderDish({ dish , isLoading, errMess }) {
    if(isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if(errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4> {errMess} </h4>
                </div>
            </div>
        )
    }else if (dish != null) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>

            </Card>

        )
    }
    else {
        return <div></div>
    }
}

const DishDetail = (props) => {

    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish = {props.dish} 
                 isLoading = {props.isLoading}
                 errMess = {props.errMess}
                />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} 
                    addComment = {props.addComment}
                    dishId = {props.dish.id}
                />
            </div>
        </div>
        </div>
    );

}






export default DishDetail;