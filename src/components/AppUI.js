import React from "react";
import {Header} from "./Header";
import {Field} from "./Field";
import {ResultBox} from "./ResultBox";
import {getColor} from "../helper/getColor";
import './css/TextArea.css'
import './css/AppUI.css'

export function ReturnApp(props) {
    const {load, config} = props;

    return (
        <body>
        {/*<div className="sections-container" style={{display: "flex", width: "100%", justifyContent: "space-between"}}>*/}
        {/*    <section className="section" style={{flex: '1 1 20%', padding: "20px 20px", width: "50vw"}}>*/}
        <Header title={config.appTitle}/>
        <div className="sections-container">

            <section className="section">

                <br/>
                <div className="card">
                    <div className="card-content">
                        <form id="form" style={{overflow: "hidden", display: "flex", flexDirection: "column"}}>
                            {config.fields.map((field, index) => (
                                <Field
                                    key={index}
                                    style={{overflow: "hidden", display: "flex", flexDirection: "column", width: "auto"}}
                                    label={field.label}
                                    id={`field-${index}`}
                                    type={field.type}
                                    icon={field.icon}
                                    hoverText={field.hoverText}
                                />
                            ))}
                            <textarea
                                id="textarea-0"
                                className="textarea"
                                placeholder={config.textArea.hoverText}
                            ></textarea>
                            <br/>
                            <div id="my-button" className="control">
                                <button
                                    id="button"
                                    className="button is-large is-fullwidth is-primary is-outlined"
                                    type="button"
                                    {...(load ? {onClick: load} : {})}
                                ></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/*<section className="section" style={{flex: '1 1', padding: "20px 20px"}}>*/}
                <section className="section">
                <h1 className="title">{config.resultRowTitle}</h1>
                <div className="columns is-multiline" style={{width: "100%!important"}}>
                    {config.resultBoxes.map((box, index) => (
                        <ResultBox
                            key={index}
                            id={`resultBox-${index}`}
                            suffix={box.suffix}
                            text={box.text}
                            color={getColor()}
                            large={index === 0 || index === 1} // Assuming you want the first two boxes to be larger.
                        />
                    ))}
                </div>
            </section>
        </div>
        </body>
    );
}
