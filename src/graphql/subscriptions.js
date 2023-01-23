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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onCreateGroup(filter: $filter, owner: $owner) {
      id
      title
      events {
        id
        title
        startTime
        endTime
        repeat
        allDay
        daysOfWeek
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onUpdateGroup(filter: $filter, owner: $owner) {
      id
      title
      events {
        id
        title
        startTime
        endTime
        repeat
        allDay
        daysOfWeek
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onDeleteGroup(filter: $filter, owner: $owner) {
      id
      title
      events {
        id
        title
        startTime
        endTime
        repeat
        allDay
        daysOfWeek
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
