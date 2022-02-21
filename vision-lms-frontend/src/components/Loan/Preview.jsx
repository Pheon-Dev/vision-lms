import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, productDetailQuery, searchQuery, loanDetailQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Preview() {
  const { loanId } = useParams();
  // const { memberId } = useParams();
  const [loanDetails, setLoanDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLoanDetails = () => {
    const query = loanDetailQuery(loanId);

    if (query) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }
  }

  useEffect(() => {
    fetchLoanDetails();
  }, [loanId]);

  // const fetchProductDetails = () => {
  //   const query = productDetailQuery(productType);

  //   if (query) {
  //     client.fetch(query).then((data) => {
  //       setProductDetails(data);
  //     });
  //   }
  // }

  // useEffect(() => {
  //   fetchProductDetails();
  // }, [productType]);

  // useEffect(() => {
  //   if (loanId) {
  //     setLoading(true);
  //     const query = searchQuery(loanId);
  //     client.fetch(query).then((data) => {
  //       setLoanDetails(data);
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(true);

  //     client.fetch(loanDetailQuery).then((data) => {
  //       setLoanDetails(data);
  //       setLoading(false);
  //     });
  //   }
  // }, [loanId]);

  // console.log('Preview of :', productDetail)
  // console.log('Member ID :', memberId)
  console.log('Preview of :', productDetails)
  const ideaName = loanId || 'all';
  if (loading) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    );
  }

  if (loanDetails?.length === 0) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    )
  }
  return (
    <pre>
      {JSON.stringify(loanDetails, undefined, 2)}
    </pre>
  )
}


