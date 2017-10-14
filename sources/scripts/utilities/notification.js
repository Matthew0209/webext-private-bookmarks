(function()
{
    /// Default post options.
    const DEFAULT_OPTIONS =
    {
        id: "",
        icon_url: "icons/main/private-bookmarks.svg",
        title: browser.i18n.getMessage("extension_name"),
        lifetime: 5000  /// The number of milliseconds until a post is cleared.
    };

    /// Enumerates notification identifiers.
    const Identifier = { BookmarkAddition: "BookmarkAddition" };

    /// Posts a notification with the specified title and message.
    /// It is cleared after a delay.
    async function post(message, options)
    {
        options = Object.assign({}, DEFAULT_OPTIONS, options);

        const id = await browser.notifications.create(
            options.id,
            {
                type:    "basic",
                title:   options.title,
                message: message,
                iconUrl: options.icon_url
            }
        );
        setTimeout(() => browser.notifications.clear(id), options.lifetime);

        return id;
    }

    define({
                Identifier: Identifier,
                post: post
           });
})();
