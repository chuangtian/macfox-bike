class CSProductCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'template-id', 'source-data'];
    }
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            const btn = e.target.closest('.all_add_cart');
            if (!btn) return;
            const inventoryQuantit = btn.getAttribute("data-quantit")

            inventoryQuantit > 0 ? handleCartAddCon(btn.getAttribute("data-variantId")) : ""
        });
    }

    disconnectedCallback() {
        console.log('元素被移除');
    }



    attributeChangedCallback(name, oldVal, newVal) {
        const sourceData = JSON.parse(this.getAttribute('source-data'));
        if (sourceData) {
            this.innerHTML = `
            <div class="flex flex-col md:flex-row items-center py-5! px-4! md:px-8! bg-gray-100 rounded-2xl overflow-hidden my-4! md:my-3!" title="${sourceData.productName}">
                <a href="${sourceData.productUrl}" class="object-contain w-[55%] md:w-auto h-full aspect-square block">
                    <img class="w-auto! h-full! mb-0!" src="${sourceData.featuredImage}" width="200" height="200" alt="${sourceData.img_alt&&sourceData.img_alt!=''?sourceData.img_alt:sourceData.productName}"/>
                </a>

                <div class=" flex flex-col justify-between py-2! pl-0! md:pl-16! h-full w-full">
                        <div class="flex-1 flex flex-col">
                            <p class="text-2xl! font-semibold! mb-1!">${sourceData.title&&sourceData.title!=''?sourceData.title:sourceData.productName}</p>
                            <div class="flex items-center gap-x-2">
                                <span class="text-xl! text-red-600! mr-3 leading-none! font-semibold!">${sourceData.productPrice}</span>
                                <span class="text-base! leading-none! line-through font-semibold!">${sourceData.productCompareAtPrice}</span>
                            </div>
                            ${sourceData.isShowParameters ?
                    ` <div class="pt-3! mb-2!">
                                ${sourceData.parameters.map((item) => {
                        const val = item.split("::")
                        if (sourceData.paramters_type == "key_val") {
                            return `<div class="leading-normal! text-lg!"><span class="font-semibold! mr-px!">${val[0]}: </span>${val[1]}</div>`
                        } else {
                            return `<span title="${val[0]}" class="bg-gray-400 text-white! rounded-sm overflow-hidden mr-3! px-2! py-1! text-base!">${val[1]}</span>`
                        }
                    }).join('')
                    }
                        </div>`: ""
                }
                           

                            <div class="flex-1 flex flex-col justify-center">
                                ${sourceData.descriptions.map(val => `<p class="mb-0! leading-[1.3]!">${val}</p>`).join('')
                }
                           </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-x-3 gap-y-3 mt-5! md:mt-3!">
                             <a class=" w-full md:w-fit md:px-16! md:py-1.5! py-1.5! text-center font-semibold! text-lg! rounded-sm bg-[#dedada]! text-[#555050]! hover:bg-[#cbc8c8]!" href="${sourceData.productUrl}">See the Ebike</a>
                             <button class="all_add_cart w-full md:w-fit md:px-16! md:py-1.5! py-1.5! text-center font-semibold! text-lg! rounded-sm bg-[#f2cb04]! text-black! hover:bg-[#d1b106]!   ${sourceData.defaultVariantQuantity <= 0 ? "cursor-not-allowed! opacity-35" : ""}" data-quantit="${sourceData.defaultVariantQuantity}"  data-variantId="${sourceData.defaultVariantId}" >Add to Cart</button>
                        </div>
                </div>
            </div>
        `
        } else {
            this.innerHTML = `<div>Not Source Data</div>`;
        }

    }

}

customElements.define('cs-product-card', CSProductCard);
