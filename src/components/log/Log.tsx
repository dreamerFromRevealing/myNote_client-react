import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import React from "react";
import {GET_LOG, UPDATE_LOG} from "../../queries/entitis/Log";
import {MDComponent} from "../reusable/mdComponent/MDComponent";

export const Log = () => {
  const {logId} = useParams();
  const [updateLog] = useMutation(UPDATE_LOG);
  const {data, loading} = useQuery(GET_LOG, {
    variables: {_id: logId}
  });

  const saveCallback = async (text: string) => {
    await updateLog({
      variables: {
        _id: logId,
        content: text
      }
    });
  }

  return <MDComponent data={data?.log?.content} loading={loading} saveCallback={saveCallback}/>;
};