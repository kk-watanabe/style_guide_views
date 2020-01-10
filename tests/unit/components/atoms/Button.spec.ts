import { shallowMount } from "@vue/test-utils";
import { ButtonType } from "@/const/Button";
import Button from "@/components/atoms/Button.vue";

const factory = (values = {}) => {
  return shallowMount(Button, { ...values });
};

describe("Button.vue", () => {
  describe("Slot", () => {
    // Default slotの値が表示される
    it("Renders default slot", () => {
      const defaultText = "SlotText";
      const wrapper = factory({
        slots: {
          default: defaultText
        }
      });
      expect(wrapper.text()).toBe(defaultText);
    });
  });
  describe("Prop", () => {
    // Color prop がある時 color classが付与する
    // color class は ButtonType の数だけある
    it("Has color prop is add color class", () => {
      const wrapper = factory();
      // Dark
      expect(wrapper.classes()).toContain("button--" + ButtonType.Dark);
      // Light
      wrapper.setProps({ color: ButtonType.Light });
      expect(wrapper.classes()).toContain("button--" + ButtonType.Light);
      // Green
      wrapper.setProps({ color: ButtonType.Green });
      expect(wrapper.classes()).toContain("button--" + ButtonType.Green);
    });

    // Disabled propがある時 disabled classが付与する
    it("Has disabled prop is add disabled class", () => {
      const wrapper = factory({
        propsData: {
          disabled: true
        }
      });
      expect(wrapper.classes()).toContain("button--disabled");
    });
  });
  describe("Emit", () => {
    // Click emitが動作する
    // clickの無効は `pointer-events: none;` で制御しているので非確認
    it("Click emit works", () => {
      const wrapper = factory();
      wrapper.trigger("click");

      expect(wrapper.emitted("click")).toBeTruthy();
      expect(wrapper.emitted("click").length).toBe(1);
      expect(wrapper.emitted("click")[0][0] instanceof MouseEvent).toBe(true);
    });
  });
});
