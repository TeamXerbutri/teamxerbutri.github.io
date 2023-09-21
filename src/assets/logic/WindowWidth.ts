import { computed, onMounted, onUnmounted } from "vue";
import { windowWidth } from "./UiState";

export class WindowWidth {

    initWindowWidth(){
        const onWidthChange = () => (windowWidth.value = window.innerWidth);
        onMounted(() => window.addEventListener("resize", onWidthChange));
        onUnmounted(() => window.removeEventListener("resize", onWidthChange));
    }
    
    getWindowWidth(): number{
        const width = computed(() => {
            return windowWidth.value;
          });
        return width.value;
    }

    getAppType(windowWidth: number): string{
        const type = computed(() => {
            if (windowWidth < 992) return "mobile";
            if (windowWidth >= 992) return "desktop";
            return "desktop"; // return desktop by default.
          });
          return type.value;
    }
}