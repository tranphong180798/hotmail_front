import {LocalScheme} from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
    // Override `fetchUser` method of `local` scheme
    async fetchUser(endpoints) {

        // Token is required but not available
        if (!this.check().valid) {
            return
        }

        // User endpoint is disabled.
        if (!this.options.endpoints.user) {
            this.$auth.setUser({})
            return
        }
        // Try to fetch user and then set
        return await this.$auth.requestWith(
            this.name,
            endpoints,
            this.options.endpoints.user
        ).then((response) => {
            this.$auth.setUser(response.data.user);
            return response;
        }).catch((error) => {
            this.$auth.callOnError(error, {method: 'fetchUser'})
        })
    }
}