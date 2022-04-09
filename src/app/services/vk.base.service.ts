import { Directive, Injectable } from '@angular/core';
import { VkBehaviourService } from './vk-behaviour.service';

@Directive()
export class VkBaseService {

    private _type: VKE

    constructor(
        private _vkBehaviour: VkBehaviourService
    ) {
    }


}