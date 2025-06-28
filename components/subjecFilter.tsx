"use client";

import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { subjects } from '@/constants';
import { useQueryState , parseAsStringEnum } from 'nuqs';

function SubjecFilter() {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useQueryState('subject', parseAsStringEnum([...subjects, "all"]).withDefault("all"));

  useEffect(()=>{
    const params = new URLSearchParams(searchParams);
    replace(`${pathName}?${params.toString()}`);
  },[pathName, replace, searchParams, subject])

  return (
    <Select onValueChange={setSubject}>
  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="All Subjects" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value='all'>All Subjects</SelectItem>
    {subjects.map((subject)=>(
      <SelectItem key={subject} value={subject} className="capitalize">
        {subject}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  )
}

export default SubjecFilter
