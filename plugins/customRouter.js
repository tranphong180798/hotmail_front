/**
 * Custom router
 */
export default (context, inject) => {
  inject('customRouter', {
    /**
     * router push
     * @param {*} toPath  遷移先のURL
     * @param {*} toQuery Query
     * @param {*} toParams Params
     */
    push: (toPath, toQuery, toParams) => {
      const routing = context.app.router.resolve({ path: toPath })
      const routeName = routing.resolved.name

      context.app.router.push({ name: routeName, query: toQuery, params: toParams })
    },

    /**
     * router push
     * @param {*} toPath  遷移先のURL
     * @param {*} toQuery Query
     * @param {*} toParams Params
     */
     href: (toPath, toQuery, toParams) => {
      const routing = context.app.router.resolve({ path: toPath })
      const routeName = routing.resolved.name

      const resolved = context.app.router.resolve({ name: routeName, query: toQuery, params: toParams })

      return resolved.href
    },
  })
}
