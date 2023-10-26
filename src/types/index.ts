export type IOrganizations = IOrganization[]

export interface IOrganization {
  id: string
  name: string
  organization_id: string
  date_created: string
}

export interface User {
  user_id: string
  email: string
  time_joined: number
  tenant_ids: string[]
  third_party_info: ThirdPartyInfo
}

export interface ThirdPartyInfo {
  user_id: string
  id: string
}
