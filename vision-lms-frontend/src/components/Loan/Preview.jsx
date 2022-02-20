import React, { useState, useEffect } from "react";
import { client, urlFor } from '../../client';

export default function Maintenance() {
  const [productDetail, setProductDetail] = useState();
  const [loanDetail, setLoanDetail] = useState();
  useEffect(() => {
    const loanQuery = '*[_type == "maintenance"]';

    client.fetch(loanQuery).then((data) => {
      setLoanDetail(data);
    });
    const query = `*[_type == "newProduct" && productName match '${loanDetail?.productType}*']`;

    client.fetch(query).then((data) => {
      setProductDetail(data);
    });
  }, []);

  // const productsList = productDetail[0].productName;
  console.log('Preview of :', productDetail)
  // console.log('Preview of :', loanDetail)
  return (
    <div>
      Maintenance Page
    </div>
  )
}


