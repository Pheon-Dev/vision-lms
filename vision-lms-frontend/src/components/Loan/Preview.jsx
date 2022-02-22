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
  const [memberDetails, setMemberDetails] = useState("");
  const [memberIdentity, setMemberIdentity] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLoanDetails = () => {
    const query = loanDetailQuery(loanId);
    const memberQuery = memberDetailQuery(memberIdentity);
    const productQuery = productDetailQuery(productType);

    if (query) {
      client.fetch(query).then((data) => {
        setLoanDetails(data);
      });
    }

    // window.location.reload()
    if (productQuery) {
      client.fetch(productQuery).then((data) => {
        setProductDetails(data);
      });
    }
    if (memberQuery) {
      client.fetch(memberQuery).then((data) => {
        setMemberDetails(data);
      });
    }
  }


  useEffect(() => {
    fetchLoanDetails();
  }, [loanId, memberIdentity, productType]);

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
  // console.log(memberDetails)
  return (
    <>
      <button className="bg-green-300 rounded-lg" onClick={() => {
        setMemberIdentity(loanDetails[0].memberId)
        setProductType(loanDetails[0].productType)
      }}>Load Member Details</button>
      <pre>
        {JSON.stringify(loanDetails, undefined, 2)}
        {JSON.stringify(memberDetails, undefined, 2)}
        {JSON.stringify(productDetails, undefined, 2)}
      </pre>
    </>
  )
}


