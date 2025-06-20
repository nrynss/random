
{{% yamltable %}}

- Flag: `component-type`
  Environment_Variable: `ENDOR_SBOM_COMPONENT_TYPE`
  Type: string
  Description: Set the SBOM component type to `application`, or `library` (default `application`).

- Flag: `output-format`
  Environment_Variable: `ENDOR_SBOM_OUTPUT_FORMAT`
  Type: string
  Description: Set the SBOM format to `json`, or `xml`. (default `json`)

- Flag: `package-version-name`
  Environment_Variable: `ENDOR_SBOM_PACKAGE_VERSION_NAME`
  Type: string
  Description: Name of the package version for which you want to generate an SBOM.

- Flag: `package-version-uuid`
  Environment_Variable: `ENDOR_SBOM_PACKAGE_VERSION_UUID`
  Type: string
  Description: The UUID of the package version for which you want to generate an SBOM.

- Flag: `timeout`
  Environment_Variable: `ENDOR_SBOM_TIMEOUT`
  Type: string
  Description: Set the timeout for the SBOM generation (default `30s`). Use the Go duration format, for example, 30s, 1m.

- Flag: `with-vex`
  Environment_Variable: `ENDOR_SBOM_WITH_VEX`
  Type: boolean
  Description: Generate the corresponding VEX document along with the SBOM.

- Flag: `project-uuid`
  Environment_Variable: `ENDOR_SBOM_PROJECT_UUID`
  Type: string
  Description: The UUID of the project for which you want to generate an SBOM.

- Flag: `project-name`
  Environment_Variable: `ENDOR_SBOM_PROJECT_NAME`
  Type: string
  Description: Name of the project for which you want to generate an SBOM.

- Flag: `app-name`
  Environment_Variable: `ENDOR_SBOM_APP_NAME`
  Type: string
  Description: Name of the application or the library. Required for multi-package SBOM export.

- Flag: `package-version-uuids`
  Environment_Variable: `ENDOR_SBOM_PACKAGE_VERSION_UUIDS`
  Type: string
  Description: The list of package version UUIDs to export an SBOM.

{{% /yamltable %}}