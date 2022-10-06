import React from 'react';
import { BsFillMoonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { setDarkTheme, setDefaultTheme } from "../../redux/reducers/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsFillCloudSunFill } from "react-icons/bs"
export default function Footer() {
  const dispatch = useDispatch();
  
  const theme = useSelector((state) => state.theme);
  const setDark = () => {
    dispatch(setDarkTheme());
  }
  const setDefault = () => {
    dispatch(setDefaultTheme());
  };
  return (
    <>
      <footer className='footer_wrap'>
        <Container>
          <div className='footer_btns'>
            <button className='add_btn'>
              <svg version="1.1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 318.6 318.6"
              >
                <polygon className="st0" points="274.1,35.5 174.6,109.4 193,65.8 " />
                <g>
                  <polygon className="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	" />
                  <polygon className="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	" />
                  <polygon className="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	" />
                  <polygon className="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	" />
                  <polygon className="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	" />
                  <polygon className="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	" />
                  <polygon className="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	" />
                </g>
                <g>
                  <polygon className="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	" />
                  <polygon className="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	" />
                </g>
                <polygon className="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 " />
                <polygon className="st3" points="179.7,193.5 188,176.1 208,185.2 " />
                <g>
                  <polygon className="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	" />
                  <polygon className="st4" points="207,206.8 211.8,247.4 238.3,207.7 	" />
                  <polygon className="st4" points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	" />
                  <polygon className="st4" points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	" />
                </g>
                <g>
                  <polygon className="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	" />
                  <polygon className="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	" />
                  <polygon className="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	" />
                  <polygon className="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	" />
                </g>
                <polygon className="st6" points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 " />
                <polygon className="st6" points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 " />
                <polygon className="st7" points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 
	140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "/>
                <polygon className="st8" points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 " />
                <g>
                  <polygon className="st9" points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 
		281.8,129.1 275.6,124.3 283.6,118.2 	"/>
                  <polygon className="st9" points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 
		140.6,106.9 44.4,35.5 	"/>
                </g>
                <polygon className="st6" points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 " />
                <polygon className="st6" points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 " />
                <polygon className="st6" points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 
	173.1,227.6 173.3,182.8 "/>
              </svg>
              Add SLICE Network</button>
            {/* <button className='status_btn'>
              <FiSettings />
              Network Status
            </button> */}
          </div>
          <hr />
          <div className='footer_sub'>
            <p>SliceLedger FZ LLC © 2022</p>
            <div className='footer_sub_btn'>
              {!theme.darkmode ?
                <button className='btn' onClick={setDark} ><BsFillMoonFill /></button> :
                <button className='btn' onClick={setDefault}><BsFillCloudSunFill /></button>
              }

              {/* <button className='btn'><AiOutlineMail /></button> */}
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
