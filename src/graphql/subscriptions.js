/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onCreateEvent(filter: $filter, owner: $owner) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onUpdateEvent(filter: $filter, owner: $owner) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onDeleteEvent(filter: $filter, owner: $owner) {
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
export const onCreateCalendarGroup = /* GraphQL */ `
  subscription OnCreateCalendarGroup(
    $filter: ModelSubscriptionCalendarGroupFilterInput
    $owner: String
  ) {
    onCreateCalendarGroup(filter: $filter, owner: $owner) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCalendarGroup = /* GraphQL */ `
  subscription OnUpdateCalendarGroup(
    $filter: ModelSubscriptionCalendarGroupFilterInput
    $owner: String
  ) {
    onUpdateCalendarGroup(filter: $filter, owner: $owner) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCalendarGroup = /* GraphQL */ `
  subscription OnDeleteCalendarGroup(
    $filter: ModelSubscriptionCalendarGroupFilterInput
    $owner: String
  ) {
    onDeleteCalendarGroup(filter: $filter, owner: $owner) {
      id
      groupName
      users
      createdAt
      updatedAt
      owner
    }
  }
`;
