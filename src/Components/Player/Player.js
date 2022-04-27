import React from 'react';
import { Slider, PlayerIcon, Direction } from 'react-player-controls'
import './player.scss'


export const Player = () => {

   //const SliderBar = ({ direction, value, style }) => <div style={{}} />
   const SliderHandle = ({ direction, value, style }) => <div style={{}} />

   return (
     <div className={'player'}>
        <div className="player__container">
           <Slider
             direction={Direction.HORIZONTAL}
             onIntent={intent => console.log(`hovered at ${intent}`)}
             onIntentStart={intent => console.log(`entered with mouse at ${intent}`)}
             onIntentEnd={() => console.log('left with mouse')}
             onChange={newValue => console.log(`clicked at ${newValue}`)}
             onChangeStart={startValue => console.log(`started dragging at ${startValue}`)}
             onChangeEnd={endValue => console.log(`stopped dragging at ${endValue}`)}
           >
              <div><div className="player__control">
                 <div className="player__item" onClick={()=>console.log('clock')}><PlayerIcon.Play /></div>
                 <div className="player__item"> <PlayerIcon.Pause /></div>
                 <div className="player__item"><PlayerIcon.Previous /></div>
                 <div className="player__item"> <PlayerIcon.Next /></div>
                 <div className="player__item"><PlayerIcon.SoundOn /></div>
                 <div className="player__item"><PlayerIcon.SoundOff /></div>
              </div></div>
           </Slider>

        </div>
     </div>
   );
};
