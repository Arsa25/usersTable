import { useState, useEffect, FC, useRef, useCallback } from "react"
import Navigation from "../components/Navigation"
import Tablee from "../components/TableComponent"


const Home: FC = () => {

    return (
            <div className='ms-Grid' dir='ltr'>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-sm2 ms-lg2'>
                        <Navigation />
                    </div>
                    <div className='ms-Grid-col ms-sm10 ms-xl10 main-element'>
                        <Tablee />
                    </div>
                </div>
            </div>
    )
}

export default Home