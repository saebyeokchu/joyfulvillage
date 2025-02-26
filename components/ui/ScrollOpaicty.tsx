import React from 'react';
import { animated, useInView, useSpring } from 'react-spring';

const ScrollOpacity = ({ children, delay = 0, className = '' } : {children : any, delay? : number, className? : string}) => {
  const [ref, inView] = useInView();

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: delay,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.div ref={ref} style={props} className={className}>
      {children}
    </animated.div>
  );
};

export default ScrollOpacity;