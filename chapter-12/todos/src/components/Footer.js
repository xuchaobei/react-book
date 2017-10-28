import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    筛选:
    {" "}
    <FilterLink filter="SHOW_ALL">
      所有
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      未完成
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      已完成
    </FilterLink>
  </p>
)

export default Footer
