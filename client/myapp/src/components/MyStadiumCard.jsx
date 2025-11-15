import React from 'react';
import '../styles/components/MyStadiumCard.css';


export default function MyStadiumCard({ stadium }) {


  return (
    <div className="stadium-card">
      <img
        src={`data:image/png;base64,${stadium.picture}`}
        alt={stadium.name}
        className="stadium-card__image"
      />
      <div className="stadium-card__content">
        <h3 className="stadium-card__name">{stadium.name}</h3>
        <p className="stadium-card__city">{stadium.city}</p>
        <p className="stadium-card__address">{stadium.address}</p>
        <div className="stadium-card__price">
          {stadium.price
            ? `${stadium.price} DA / hour`
            : 'Price not available'}
        </div>
      </div>
    </div>
  );
}
