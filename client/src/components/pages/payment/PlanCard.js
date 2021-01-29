import React from "react";
const planCard = props => {
    return (
        <div className="planCard d-inline-block">
            <h3 className={props.bgColor}>Platttt plan</h3>
            <h4>{props.header}</h4>
            <p className="">
                ras sit amet nibh libero, in gravida nulla. Nulla vel metusscelerisque
                ante sollicitudin Nulla vel metus scelerisque
      </p>
      <button type="button" className="general-btn">Subscribe</button>
        </div>
    );
};

export default planCard;
