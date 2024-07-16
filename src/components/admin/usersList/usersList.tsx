'use client'

import { GetUsers } from "@/api/gqlApi/login";
import { useQuery } from "@apollo/client";

export const UsersListClient = () => {
    const {loading, error, data} = useQuery(GetUsers, {
        variables:  {
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'createdAt',  
        sortDirection: 'desc',
        searchTerm: '',
        statusFilter: 'ALL'}
    });
    console.log(data)
    return <div>555555</div>
}