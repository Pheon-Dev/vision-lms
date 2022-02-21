import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";

import Layout from './Layout';
import Spinner from './Spinner';

export default function Feed() {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      setLoading(true);
      const query = searchQuery(productId);
      client.fetch(query).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    }
  }, [productId]);

  const ideaName = productId || 'all';
  if (loading) {
    return (
      <Spinner message={`We are populating ${ideaName} product data to your feed!`} />
    );
  }

  if (members?.length === 0) {
    return (
      <div className="text-xl font-bold text-center items-center">No data available yet for {ideaName} product.</div>
    )
  }

  return (
    <div>
      {
        members && (
          <Layout members={members} />
        )
      }
    </div>
  )
}