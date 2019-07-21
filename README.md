# Notational - A utility for creating and opening Notational files

Takes a note title as argument, creates a file of `<timestamp>-<title>.md`, and opens the file in your favorite editor.

If you don't specify the editor with the `--editor` flag your `EDITOR` environment variable will be used.

<pre>
Usage: notational [options] [title]

Options:
-e, --editor [command]  choose editor
-V, --version           output the version number
-h, --help              output usage information

Examples:
$ notational "My Note Title"
$ notational --editor code "My Note Title"
</pre>
