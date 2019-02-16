import React from 'react'
import { FilePicker } from 'react-file-picker'
import csvtojson from 'csvtojson'

export default class Admin extends React.Component {
    state = {
        success: 0,
        json: []
    }
    render() {
        return (
            <div>
                <FilePicker
                    extensions={['csv']}
                    onChange={FileObject => {
                        let reader = new FileReader()
                        reader.readAsText(FileObject)
                        reader.onload = () => {
                            csvtojson().fromString(reader.result).then(result =>
                                this.setState({ success: 1, json: result })
                            ).catch(err => {
                                console.log(err)
                                this.setState({success: -1})
                            })
                        };

                    }}
                    onError={_ => this.setState({ success: -1 })}
                >
                    <button>
                        Click to upload hospital price list.
                    </button>
                </FilePicker>
                <h3>{(this.state.success == 1 && `Upload Successful - ${this.state.json.length} items added`) || (this.state.success == -1 && "Could not parse file.")}</h3>
                <p>Google Places import {  } from 'module';:</p>
                <input></input>
            </div>
        )
    }
}