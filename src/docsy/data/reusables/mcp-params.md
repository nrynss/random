The following parameters are commonly used to optimize MCP server performance.

- `command`: The full path to the endorctl executable. Run `which endorctl` to fetch the path of the endorctl executable.
- `MCP_ENDOR_SCAN_LANGUAGES`: The programming languages to scan. You can use the following languages: `c#, go, java, javascript, kotlin, objective-c, php, python, ruby, rust, scala, swift, typescript`. Enter multiple languages separated by commas. For example, `"go,java,python"`.

{{< alert title="Note" color="info" >}}
You can use any Endor Labs environment variable for the `endorctl scan` command in the MCP server configuration. However, you must prefix all Endor Labs environment variables with `MCP_`. See [Endor Labs environment variables](../../../endorctl/commands/scan/#options) for more information.
{{< /alert >}}
