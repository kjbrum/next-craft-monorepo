import { gql } from 'graphql-request'

export const SEOMATIC_FRAGMENT = gql`
    fragment SeomaticFragment on SeomaticType {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
        metaScriptContainer
        metaJsonLdContainer
    }
`
