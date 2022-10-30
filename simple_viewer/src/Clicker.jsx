import 'bootstrap/dist/css/bootstrap.css';
import './Clicker.css';

import React from 'react';

export default class Clicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            overlay: null,
            images: [],
        }
    }

    loadImages = async (base) => {
        await fetch(`http://20.0.0.86:3000/similar/${base}/10/`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    images: data,
                }, () => {
                    console.log(data);
                });
            });
    }

    componentDidMount = async () => {
        await this.loadImages((await (await fetch(`http://20.0.0.86:3000/random/`)).json()).id);
        // interval = setInterval(this.loadImages, 10000);
    }

    render() {
        return (
            this.state.overlay
            ?? <div>
                {this.state.images.map((image) => <img className='display' src={image.url} onClick={() => {
                    this.setState({
                        overlay: (
                            <div className='overlay'>
                                <h1>{image.title}</h1>
                                <h2>{image.author}</h2>
                                <h3>{image.created}</h3>
                                <p>{image.description}</p>
                                <img className='full' src={image.url}></img>
                                <button onClick={() => {
                                    this.setState({ overlay: null });
                                    this.loadImages(image.id);
                                }}>Show more like this</button>
                            </div>
                        )
                    })
                }} alt='img'></img>)}
            </div>
        )
    }
}
