import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const Filter = ({ filter, setFilter }: { filter: any; setFilter: any }) => {
  return (
    <Tabs defaultValue='all' onValueChange={(e) => setFilter(e)}>
      <TabsList>
        <TabsTrigger value='all'>All</TabsTrigger>
        <TabsTrigger value='completed'>Completed</TabsTrigger>
        <TabsTrigger value='waiting'>Waiting</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default Filter;
