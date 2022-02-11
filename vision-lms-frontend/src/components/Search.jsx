import React, { useEffect, useState } from "react";
import Layout from './Layout';
import { client } from '../client';
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from './Spinner';

export default function Search({ searchTerm }) {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching ..." />}
      {members?.length !== 0 && <Layout members={members} />}
      {members?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No results found!</div>
      )}
    </div>
  )
}
