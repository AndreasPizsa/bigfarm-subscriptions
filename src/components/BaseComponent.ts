import {Component, Prop, Vue} from "vue-property-decorator";
import {IDictionary} from "@/core/IDictionary";

export abstract class BaseComponent extends Vue {
    @Prop({required: true}) public text!: IDictionary<string>;

    public t(id: string, ...args: string[]): string {
        const text = (args || []).reduce((result, arg, index) => {
            return result.replace(new RegExp(`\\{${index}\\}`, 'g'), arg)
        }, this.text[id] || id);
        return decodeHtml(text)
    }

    public t_html(id: string, ...args: string[]): string {
        return this
            .t(id, ...args)
            .split(/\n{2}/)
            .filter(t => t && t.trim().length > 0)
            .map(t => `<p>${t}</p>`)
            .join('')
            .replace(/\n/g, '<br/>')
    }
}
