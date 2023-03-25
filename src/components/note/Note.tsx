import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_DOCUMENT, UPDATE_DOCUMENT} from "../../queries/entitis/Document";
import {MDComponent} from "../reusable/mdComponent/MDComponent";
import React from "react";

export const Note = () => {
  const { docId } = useParams();
  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  const {data, loading} = useQuery(GET_DOCUMENT, {
    variables: {_id: docId}
  });

  const saveCallback = async (text: string) => {
    await updateDocument({
      variables: {
        _id: docId,
        content: text
      }
    });
  }

  return <MDComponent data={data?.document.content} loading={loading} saveCallback={saveCallback}/>;
};