import CompanionCard from '@/components/companionCard';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import React from 'react'
import SearchInput from '../../components/searchInput';
import SubjecFilter from '@/components/subjecFilter';

async function CompanionsPage({searchParams}: SearchParams) {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic :"";
  
  const companions = await getAllCompanions({subject, topic});
  console.log(companions);

  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <h1>
          Companion Library
        </h1>
        <div className='flex gap-4'>
          <SearchInput />
          <SubjecFilter />
        </div>
      </section>
      <section className='companions-grid'>
        {companions.map((companion)=>(
          <CompanionCard key={companion.id} {...companion}
          color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  )
}

export default CompanionsPage
