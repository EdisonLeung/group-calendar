/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      startTime
      endTime
      repeat
      allDay
      daysOfWeek
      group
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        startTime
        endTime
        repeat
        allDay
        daysOfWeek
        group
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCalendarGroup = /* GraphQL */ `
  query GetCalendarGroup($id: ID!) {
    getCalendarGroup(id: $id) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCalendarGroups = /* GraphQL */ `
  query ListCalendarGroups(
    $filter: ModelCalendarGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalendarGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupName
        users
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
