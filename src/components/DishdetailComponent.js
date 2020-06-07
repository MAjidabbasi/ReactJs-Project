import React, { Component, Object } from 'react';
import { Card, CardImg, CardBody, CardImgOverlay, CardText, CardTitle } from 'reactstrap'
import '../App.css';




class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }
    renderComments(c) {
        // let size = c.keys(comments).length;
        if (c != null) {

            return (
                <div>
                    <h4>Comments</h4>
                    <div>
                    {c.comments.map((comment) => {
                        return (
                            <ul key={comment.id} className=' list-unstyled'>
                               
                               <li> {comment.comment}
                                  
                                </li>
                               <li>
                                    <li>
                                        <br/>
                                    </li>
                                   { "-- " + comment.author+ ","} 
                                     {new Intl.DateTimeFormat('en-US',{year: 'numeric',month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} 
                               </li>
                        
                            </ul>

                           
                )
                    })


                    }
    </div>
                    {/* {c.comments[0].comment} */}
                </div>
            )
        }
    }
    renderDish(dish) {
        if (dish != null) {
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

    render() {

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.dish)}

                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        )

    }
}





export default DishDetail;