import React, { Component } from 'react'
import * as ml5 from 'ml5'
import tiger from '../tiger.jpg'
import penguin from '../penglin.jpg'

interface Prediction {
    label: string,
    confidence: any
}

class List extends Component {

    imageRef = React.createRef()

    state = {
        predictions: []
    }

    setPredictions = (pred: Prediction) => {
        this.setState({
            predictions: pred
        })
    }

    classifyImg = () => {
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded)
        const image = document.getElementById('image')
    
        function modelLoaded() {
            console.log('Model loaded');   
        }

        classifier.classify(image, 5, (err: any, results: Prediction) => {
            return results
            
        })
        .then((results: Prediction) => {
            this.setPredictions(results)
        })
    }

    componentDidMount() {
        this.classifyImg();
    }

    render() {
        let predictions: any = (<div className="loader"></div>)

        if(this.state.predictions.length > 0){
            predictions = this.state.predictions.map((pred: Prediction, i: number) => {
                let { label, confidence } = pred
                confidence = Math.floor(confidence * 10000) / 100 + '%'
                return (
                <div key={ i + '' }> { i + 1 }. Prediction: { label } at { confidence }</div>
                )
            })
        }

        return (
            <div>
                <img src={ penguin } id='image' width='400' alt=""/>
                { predictions }
            </div>
        )
    }
}

export default List;